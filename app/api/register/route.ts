import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const parentName = formData.get('parentName') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const childName = formData.get('childName') as string;
    const childAge = formData.get('childAge') as string;
    const specialNeedsDetail = formData.get('specialNeedsDetail') as string;
    const childCount = formData.get('childCount') as string;
    const file = formData.get('billUpload') as File;

    if (!parentName || !phone || !childName || !childAge || !file) {
      return NextResponse.json(
        { error: 'Vui lòng điền đầy đủ các thông tin bắt buộc.' },
        { status: 400 }
      );
    }

    // Ensure API keys are set
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Missing Supabase keys!');
      return NextResponse.json(
        { error: 'Hệ thống chưa được cấu hình cơ sở dữ liệu (Supabase API Keys missing).' },
        { status: 500 }
      );
    }

    // 1. Upload bill image to Supabase Storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('payment_bills')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.error('Storage Upload Error:', uploadError);
      return NextResponse.json(
        { error: 'Không thể tải ảnh lên. Có thể bucket chưa được cấu hình đúng.' },
        { status: 500 }
      );
    }

    const { data: publicUrlData } = supabase.storage
      .from('payment_bills')
      .getPublicUrl(fileName);

    const billUrl = publicUrlData.publicUrl;

    // 2. Save registration data to Supabase Database
    const { error: dbError } = await supabase
      .from('registrations')
      .insert([
        {
          parent_name: parentName,
          phone: phone,
          email: email,
          child_name: childName,
          child_age: parseInt(childAge, 10),
          special_needs: specialNeedsDetail || 'Không',
          child_count: parseInt(childCount, 10),
          bill_url: billUrl,
        }
      ]);

    if (dbError) {
      console.error('Database Insert Error:', dbError);
      return NextResponse.json(
        { error: 'Đã tải ảnh thành công nhưng không thể lưu dữ liệu đăng ký. Kiểm tra lại cấu hình Database Table.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, billUrl });
  } catch (error: any) {
    console.error('Server Error:', error);
    return NextResponse.json(
      { error: 'Đã có lỗi hệ thống xảy ra.' },
      { status: 500 }
    );
  }
}
