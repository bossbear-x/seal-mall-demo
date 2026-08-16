import type { Product } from '../types'
import aptamilStep3 from '../assets/products/aptamil-step3.png'
import aptamilStep1 from '../assets/products/aptamil-step1.png'
import aptamilStep2 from '../assets/products/aptamil-step2.png'
import aptamilStep4 from '../assets/products/aptamil-step4.png'
import aptamilDetail from '../assets/figma/detail-gallery-1.png'
import aptamilDetail2 from '../assets/figma/detail-gallery-2.png'
import aptamilDetail3 from '../assets/figma/detail-gallery-3.png'
import pigeonBottle from '../assets/products/pigeon-bottle.png'
import bellamysStep1 from '../assets/products/bellamys-step1.png'
import qvBaby from '../assets/products/qv-baby.png'
import bboxGreen from '../assets/products/bbox-green.png'
import bboxBrown from '../assets/products/bbox-brown.png'
import medelaPump from '../assets/products/medela-pump.png'
import huggiesWipes from '../assets/products/huggies-wipes.png'
import huggiesDiapers from '../assets/products/huggies-diapers.png'

export const products: Product[] = [
  {
    id: 'aptamil-step3',
    name: 'Aptamil（アプタミル）幼児用粉ミルク Step3',
    description: '1歳から・毎日をサポート / 900g',
    price: 5080,
    image: aptamilStep3,
    badge: '売れ筋',
    badgeTone: 'neutral',
    section: 'trend',
    gallery: [aptamilDetail, aptamilDetail2, aptamilDetail3],
    specs: {
      原産国: 'オーストラリア',
      賞味期限: '2027年8月',
      内容量: '900g',
      ブランド: 'Aptamil（アプタミル）',
    },
  },
  {
    id: 'pigeon-bottle',
    name: 'Pigeon（ピジョン）哺乳びん',
    description: '新生児から・やさしい飲み口',
    price: 5360,
    image: pigeonBottle,
    badge: '数量限定',
    badgeTone: 'neutral',
    section: 'trend',
  },
  {
    id: 'bellamys-step1',
    name: 'Bellamy’s Organic（ベラミーズ）Step1',
    description: '新生児から・オーガニック成分配合',
    price: 7100,
    image: bellamysStep1,
    badge: '限定',
    badgeTone: 'neutral',
    section: 'trend',
  },
  {
    id: 'qv-baby',
    name: 'QV Baby（キューヴィー）モイスチャークリーム 250g',
    description: '小児科医推奨・低刺激処方',
    price: 3280,
    image: qvBaby,
    badge: '低刺激',
    badgeTone: 'neutral',
    section: 'trend',
  },
  {
    id: 'bbox-green',
    name: 'b.box（ビーボックス）シッピーカップ',
    description: 'どんな角度でも漏れない設計',
    price: 3280,
    image: bboxGreen,
    section: 'trend',
  },
  {
    id: 'bbox-brown',
    name: 'b.box（ビーボックス）シッピーカップ',
    description: 'どんな角度でも漏れない設計',
    price: 3000,
    image: bboxBrown,
    section: 'trend',
  },
  {
    id: 'medela-pump',
    name: 'Medela（メデラ）電動さく乳器',
    description: 'スイング・マキシ 電動搾乳機',
    price: 28600,
    image: medelaPump,
    badge: '秒殺',
    badgeTone: 'sale',
    section: 'recommended',
  },
  {
    id: 'aptamil-step1',
    name: 'Aptamil（アプタミル）幼児用粉ミルク Step1',
    description: '新生児から・海外純正品 / 900g',
    price: 5480,
    image: aptamilStep1,
    section: 'recommended',
  },
  {
    id: 'aptamil-step2',
    name: 'Aptamil（アプタミル）幼児用粉ミルク Step2',
    description: '6ヶ月から・栄養満点 / 900g',
    price: 5280,
    image: aptamilStep2,
    section: 'recommended',
  },
  {
    id: 'aptamil-step4',
    name: 'Aptamil（アプタミル）幼児用粉ミルク Step4',
    description: '2歳から・栄養設計 / 900g',
    price: 4980,
    image: aptamilStep4,
    section: 'recommended',
  },
  {
    id: 'huggies-wipes',
    name: 'Huggies（ハギーズ）ベビー湿巾',
    description: '大容量 384枚入・無香料タイプ',
    price: 3360,
    image: huggiesWipes,
    section: 'recommended',
  },
  {
    id: 'huggies-diapers',
    name: 'Huggies（ハギーズ）おむつ',
    description: 'Dry系列・通気性抜群・新生児用',
    price: 2980,
    image: huggiesDiapers,
    section: 'recommended',
    specs: {
      カテゴリー: 'おむつ',
      タイプ: 'テープタイプ',
      対象: '新生児用',
      ブランド: 'Huggies（ハギーズ）',
    },
  },
]

export const productById = (id: string) => products.find((product) => product.id === id) ?? products[0]
