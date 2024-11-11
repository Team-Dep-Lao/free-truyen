import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-4 pb-10">
      <div className="web-container min-[1200px]:px-0 px-4 grid sm:grid-cols-4 gap-4">
        <div className="flex flex-col space-y-2">
          <div className="font-bold text-2xl">Free Truyen</div>
          <Link href={"/intro"} className="">
            Giới thiệu
          </Link>
          <Link href={"/contact"} className="">
            Liên hệ
          </Link>
        </div>
        <div className="sm:col-span-3">
          <div className="text-lg font-bold">Miễn trừ trách nhiệm</div>
          <div className="mt-4">
            Trang web này cung cấp nội dung truyện tranh chỉ với mục đích giải
            trí và không chịu trách nhiệm về bất kỳ nội dung quảng cáo, liên kết
            của bên thứ ba hiển thị trên trang web của chúng tôi.
          </div>
          <div className="mt-2">
            Tất cả thông tin và hình ảnh trên website đều được thu thập từ
            internet. Chúng tôi không chịu trách nhiệm về bất kỳ nội dung nào.
            Nếu bạn hoặc tổ chức của bạn có vấn đề gì liên quan đến nội dung
            hiển thị trên website, vui lòng liên hệ với chúng tôi để được giải
            quyết.
          </div>
        </div>
      </div>
      <div className="web-container text-xs sm:px-0 px-4 sm:pt-0 pt-10">
        <div>2024 Copyright By Kiendev.click</div>
      </div>
    </footer>
  );
}
