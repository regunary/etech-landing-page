// ...existing code...
import loudspeaker from '@assets/icons/ic-loudSpeaker.svg'
import techPeople from '@assets/icons/ic-techPeopel.svg'

export type FutureCard = {
  title: string
  desc: string
  icon: string
}

export const futureCards: FutureCard[] = [
  {
    title: 'Chuyển đổi số thông minh',
    desc: 'ETECHS giúp doanh nghiệp và giáo dục số hoá toàn diện, kết hợp dữ liệu – AI – con người để tạo nên hệ thống vận hành.',
    icon: loudspeaker
  },
  {
    title: 'Hệ sinh thái dữ liệu học máy',
    desc: 'Hợp nhất dữ liệu cấu trúc, phi cấu trúc và bán cấu trúc thành nền tảng duy nhất, dựa trên metadata & link-data.',
    icon: loudspeaker
  },
  {
    title: 'Tự động hóa bằng AI',
    desc: 'Tăng tốc quy trình với AI Agent, Chatbot và hệ thống tự động hoá có khả năng phân tích, dự báo và phản hồi thời gian thực.',
    icon: loudspeaker
  },
  {
    title: 'Kết nối End-to-End',
    desc: 'Tạo mạng lưới kết nối thông minh giữa giáo viên – học sinh, khách hàng – nhà cung cấp để đồng bộ hoá và cá nhân hoá.',
    icon: loudspeaker
  },
  {
    title: 'Công nghệ vì con người',
    desc: 'ETECHS thúc đẩy đổi mới sáng tạo có trách nhiệm, đảm bảo mọi giải pháp công nghệ đều hướng đến giá trị và cộng đồng.',
    icon: techPeople
  }
]
