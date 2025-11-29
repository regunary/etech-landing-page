import techPeople from '@assets/icons/ic-techPeopel.svg'
import treeStructure from '@assets/icons/ic-treeStructure.svg'
import hardWare from '@assets/icons/ic-hardWare.svg'
interface SolutionCard {
  icon: string
  title: string
  description: string
}

export const solutionCards: SolutionCard[] = [
  {
    icon: treeStructure,
    title: 'Chuyển dữ liệu thành\ntrí tuệ',
    description:
      'Thu thập, xử lý và hợp nhất dữ liệu từ nhiều nguồn để tạo ra tri thức có cấu trúc phục vụ phân tích, dự báo và ra quyết định.'
  },
  {
    icon: hardWare,
    title: 'Chuyển đối tượng thực sang đối tượng số',
    description:
      'Số hoá quy trình, thiết lập ontology & link-data, tạo AI Agent và Chatbot giúp hệ thống hiểu và phản hồi như con người.'
  },
  {
    icon: techPeople,
    title: 'Xây dựng mạng lưới kết nối thông minh',
    description:
      'Kết nối người - dữ liệu - dịch vụ thông qua đồ thị tri thức (Knowledge Graph), hình thành các mạng lưới'
  }
]
