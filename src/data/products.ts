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
import bubs from '../assets/figma/category-bubs.png'
import a2 from '../assets/figma/category-a2.png'
import description01 from '../assets/figma/detail-description-01.png'
import description02 from '../assets/figma/detail-description-02.png'
import description03 from '../assets/figma/detail-description-03.png'
import description04 from '../assets/figma/detail-description-04.png'
import description05 from '../assets/figma/detail-description-05.png'
import description06 from '../assets/figma/detail-description-06.png'

export const products: Product[] = [
  {
    id: 'aptamil-step3',
    name: 'Aptamil（アプタミル）幼児用粉ミルク Step3',
    description: '1歳から・毎日をサポート / 900g',
    price: 5080,
    image: aptamilStep3,
    badge: '人気',
    badgeTone: 'neutral',
    section: 'trend',
    category: 'milk',
    age: '1plus',
    functions: ['dailySupport'],
    isPopular: true,
    ranking: 1,
    gallery: [aptamilDetail, aptamilDetail2, aptamilDetail3],
    detailImages: [description01, description02, description03, description04, description05, description06, description05],
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
    category: 'bottle',
    isNew: true,
    newArrivalOrder: 3,
    specs: {
      カテゴリ: '哺乳びん',
      対象: '新生児から',
      内容: '哺乳びん 1本',
      ブランド: 'Pigeon（ピジョン）',
    },
    detailSections: [
      { title: '商品概要', body: '毎日の授乳シーンで使いやすい、シンプルな哺乳びんです。' },
      { title: '特徴', body: '持ちやすい形状\n日々のお世話に取り入れやすい構成\nパーツを分けてお手入れ可能' },
      { title: 'おすすめポイント', body: '授乳に必要な基本機能を、わかりやすくまとめています。' },
      { title: '使用シーン', body: 'ご家庭での授乳や、外出前の準備にお使いいただけます。' },
      { title: '注意事項', body: 'ご使用前に商品パッケージの表示とお手入れ方法をご確認ください。' },
    ],
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
    category: 'milk',
    age: 'newborn',
    functions: ['organic'],
    ranking: 3,
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
    category: 'other',
    isNew: true,
    newArrivalOrder: 1,
  },
  {
    id: 'bbox-green',
    name: 'b.box（ビーボックス）シッピーカップ',
    description: 'どんな角度でも漏れない設計',
    price: 3280,
    image: bboxGreen,
    section: 'trend',
    category: 'bottle',
  },
  {
    id: 'bbox-brown',
    name: 'b.box（ビーボックス）シッピーカップ',
    description: 'どんな角度でも漏れない設計',
    price: 3000,
    image: bboxBrown,
    section: 'trend',
    category: 'bottle',
  },
  {
    id: 'medela-pump',
    name: 'Medela（メデラ）電動さく乳器',
    description: 'スイング・マキシ 電動搾乳機',
    price: 28600,
    image: medelaPump,
    badge: 'タイムセール',
    badgeTone: 'sale',
    section: 'recommended',
    category: 'pump',
    isTimeSale: true,
    specs: {
      カテゴリ: '搾乳器',
      タイプ: '電動',
      セット内容: '本体・付属パーツ',
      ブランド: 'Medela（メデラ）',
    },
    detailSections: [
      { title: '商品概要', body: '日々の授乳準備をサポートする電動さく乳器です。' },
      { title: '特徴', body: '電動タイプ\n必要なパーツをまとめた構成\n日々の授乳準備に取り入れやすい設計' },
      { title: 'おすすめポイント', body: '自宅での準備を、ひとつのセットで始められます。' },
      { title: '使用シーン', body: '自宅での搾乳や、授乳リズムに合わせた準備にお使いいただけます。' },
      { title: 'セット内容', body: '本体と、使用に必要な付属パーツをまとめています。' },
      { title: '注意事項', body: 'ご使用前に取扱説明書を読み、各パーツのお手入れ方法をご確認ください。' },
    ],
  },
  {
    id: 'aptamil-step1',
    name: 'Aptamil（アプタミル）幼児用粉ミルク Step1',
    description: '新生児から・海外純正品 / 900g',
    price: 5480,
    image: aptamilStep1,
    section: 'recommended',
    category: 'milk',
    age: 'newborn',
    isNew: true,
    newArrivalOrder: 4,
  },
  {
    id: 'aptamil-step2',
    name: 'Aptamil（アプタミル）幼児用粉ミルク Step2',
    description: '6ヶ月から・栄養満点 / 900g',
    price: 5280,
    image: aptamilStep2,
    section: 'recommended',
    category: 'milk',
    age: '6-12',
    isNew: true,
    newArrivalOrder: 2,
  },
  {
    id: 'aptamil-step4',
    name: 'Aptamil（アプタミル）幼児用粉ミルク Step4',
    description: '2歳から・栄養設計 / 900g',
    price: 4980,
    image: aptamilStep4,
    section: 'recommended',
    category: 'milk',
    age: '2plus',
  },
  {
    id: 'huggies-wipes',
    name: 'Huggies（ハギーズ）ベビー湿巾',
    description: '大容量 384枚入・無香料タイプ',
    price: 3360,
    image: huggiesWipes,
    section: 'recommended',
    category: 'diaper',
  },
  {
    id: 'huggies-diapers',
    name: 'Huggies（ハギーズ）おむつ',
    description: 'Dry系列・通気性抜群・新生児用',
    price: 2980,
    image: huggiesDiapers,
    section: 'recommended',
    category: 'diaper',
    specs: {
      カテゴリー: 'おむつ',
      タイプ: 'テープタイプ',
      対象: '新生児用',
      ブランド: 'Huggies（ハギーズ）',
    },
  },
  {
    id: 'bubs-step1',
    name: 'Bubs Organic（バブズ）グラスフェッド粉ミルク Step1',
    description: '新生児から・牧草飼育牛ミルク使用 / 800g',
    price: 6980,
    image: bubs,
    badge: '予約中',
    badgeTone: 'neutral',
    section: 'category',
    category: 'milk',
    age: 'newborn',
    functions: ['grassFed'],
    ranking: 2,
  },
  {
    id: 'a2-platinum',
    name: 'a2 Platinum（a2プラチナム）プレミアム粉ミルク Step2',
    description: '6〜12ヶ月・A2プロテイン配合 / 900g',
    price: 6580,
    image: a2,
    section: 'category',
    category: 'milk',
    age: '6-12',
    functions: ['a2'],
    ranking: 4,
  },
]

export const productById = (id: string) => products.find((product) => product.id === id) ?? products[0]
