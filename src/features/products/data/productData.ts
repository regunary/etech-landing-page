import hero from '@assets/cards/ai2.svg'

export type ProductSection = {
  id: string
  type: 'left' | 'right'
  badge: string
  title: string
  highlightText: string
  description: string
  features: string[]
  image: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | string
  highlightFirst?: boolean
  cta_label?: string
  cta_link?: string
}

export const productSections: ProductSection[] = [
  {
    id: '1',
    type: 'left',
    badge: 'Sản phẩm',
    title: 'Nền tảng dữ liệu hợp nhất –',
    highlightText: 'ETECHS Data Intelligence Platform',
    description:
      'Nền tảng hợp nhất toàn bộ dữ liệu của tổ chức (Data Source → Data Lake → Data Warehouse → Data Mart).',
    features: [
      'Chuẩn hoá, liên kết & phân tích dữ liệu theo thời gian thực.',
      'Kết nối các hệ thống ERP, CRM, LMS, e-Learning, HRM.',
      'Hỗ trợ AI Query, Recommendation System, Semantic Search.'
    ],
    image: hero,
    cta_label: 'Khám phá giải pháp',
    cta_link: '/solutions'
  },
  {
    id: '2',
    type: 'right',
    badge: 'Sản phẩm',
    title: 'Framework',
    highlightText: 'AI Middleware & AI Agent',
    description: 'Tầng trung gian AI cho phép kết nối, huấn luyện và triển khai các mô hình trí tuệ nhân tạo.',
    features: [
      'Tích hợp LLM, GenAI, Chatbot, AI Agent.',
      'Cấu trúc module: AI Data Lake, AI Training, AI Inference, AI Webapp.',
      'Hỗ trợ xử lý ngôn ngữ tự nhiên (NLP), nhận dạng hình ảnh, giọng nói, video.'
    ],
    image: hero,
    highlightFirst: true,
    cta_label: 'Khám phá giải pháp',
    cta_link: '/solutions'
  },
  {
    id: '3',
    type: 'left',
    badge: 'Sản phẩm',
    title: 'Hệ thống CĐS Giáo dục –',
    highlightText: 'ETECHS Smart Education Suite',
    description: 'Giải pháp chuyển đổi số toàn diện cho trường học, trung tâm và cơ sở giáo dục.',
    features: [
      'Hệ thống quản lý đào tạo, học liệu, sinh viên, giảng viên, ký túc xá.',
      'AI trợ giảng, Chatbot tư vấn học tập, phân tích hành vi học sinh.',
      'Kết nối Student – Teacher – Parent trên đồ thị tri thức.'
    ],
    image: hero,
    cta_label: 'Khám phá giải pháp',
    cta_link: '/solutions'
  },
  {
    id: '4',
    type: 'right',
    badge: 'Sản phẩm',
    title: 'Hệ thống CĐS Doanh nghiệp –',
    highlightText: 'ETECHS Smart Business Platform',
    description: 'Cầu nối dữ liệu giữa social network ↔ hệ thống nội bộ doanh nghiệp (CRM, ERP).',
    features: [
      'Quản lý khách hàng, đơn hàng, kho bãi, logistics, phân phối.',
      'AI phân tích hành vi, dự báo nhu cầu, tự động hoá marketing.',
      'Chatbot tư vấn và hỗ trợ chăm sóc khách hàng.'
    ],
    image: hero,
    cta_label: 'Khám phá giải pháp',
    cta_link: '/solutions'
  },
  {
    id: '5',
    type: 'left',
    badge: 'Sản phẩm',
    title: 'Blockchain &',
    highlightText: 'Verification Layer',
    description: 'Công nghệ xác thực và truy xuất dữ liệu an toàn.',
    features: [
      'Chứng thực học tập, hồ sơ, chứng chỉ, sản phẩm và giao dịch.',
      'Tích hợp Lightning Network cho xử lý tức thời.'
    ],
    image: hero,
    cta_label: 'Khám phá giải pháp',
    cta_link: '/solutions'
  },
  {
    id: '6',
    type: 'right',
    badge: 'Sản phẩm',
    title: '& Data Query Engine',
    highlightText: 'Knowledge Graph',
    description: 'Nền tảng đồ thị tri thức (Knowledge Graph) liên kết con người, quy trình, sản phẩm và dịch vụ.',
    features: [
      'Hỗ trợ truy vấn ngữ nghĩa, tìm kiếm thông minh, gợi ý theo ngữ cảnh.',
      'Là “bộ não trung tâm” cho toàn bộ hệ sinh thái ETECHS.'
    ],
    image: hero,
    highlightFirst: true,
    cta_label: 'Khám phá giải pháp',
    cta_link: '/solutions'
  },
  {
    id: '7',
    type: 'left',
    badge: 'Sản phẩm',
    title: 'Hệ thống Truy vấn &',
    highlightText: 'Phân tích Dữ liệu (AI Data Analytics)',
    description: '',
    features: [
      'Khai phá dữ liệu, thống kê, dự báo và trực quan hoá.',
      'Tích hợp với BI Tools (Tableau, Power BI).',
      'Cung cấp insight theo thời gian thực cho quản trị và chiến lược.'
    ],
    image: hero,
    cta_label: 'Khám phá giải pháp',
    cta_link: '/solutions'
  },
  {
    id: '8',
    type: 'right',
    badge: 'Sản phẩm',
    title: 'Hệ thống AI Chatbot &',
    highlightText: 'Virtual Assistant',
    description: '',
    features: [
      'Chatbot đa ngữ cảnh: tư vấn, chăm sóc, hướng dẫn, hỗ trợ kỹ thuật.',
      'Tùy biến theo từng lĩnh vực (giáo dục, doanh nghiệp, logistics…).',
      'Tích hợp trực tiếp với Data Lake, CRM, LMS.'
    ],
    image: hero,
    cta_label: 'Khám phá giải pháp',
    cta_link: '/solutions'
  }
]
