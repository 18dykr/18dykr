
import { Organelle } from '../types';

export const organelles: Organelle[] = [
  {
    id: 'cell_wall',
    name: '细胞壁 (Cell Wall)',
    shortDescription: '植物细胞的“铠甲”',
    structure: '【结构特征】\n位于植物细胞最外层，主要成分是纤维素和果胶。质地坚韧，全透性。',
    function: '【核心功能】\n支持和保护作用，维持植物细胞的长方形形态。',
    color: 'bg-lime-700',
    hexColor: '#4d7c0f',
    position: { top: '0%', left: '0%', width: '100%', height: '100%' },
    position3d: [0, 0, 0],
    scale3d: [8, 10, 3], // Tall rectangular shape
    shapeType: 'rounded_box',
    icon: '🧱',
    image: 'https://images.unsplash.com/photo-1518117621406-25f02bc0f252?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'cell_membrane',
    name: '细胞膜 (Cell Membrane)',
    shortDescription: '细胞的边界与大门',
    structure: '【结构特征】\n紧贴细胞壁内侧的一层薄膜，由磷脂双分子层和蛋白质构成。',
    function: '【核心功能】\n控制物质进出，进行细胞间信息交流。',
    color: 'bg-lime-400',
    hexColor: '#a3e635',
    position: { top: '2%', left: '2%', width: '96%', height: '96%' },
    position3d: [0, 0, 0],
    scale3d: [7.6, 9.6, 2.6], // Slightly smaller than wall
    shapeType: 'rounded_box',
    icon: '🛡️',
    image: 'https://plus.unsplash.com/premium_photo-1675718765955-a2221b6d0800?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'vacuole',
    name: '中央大液泡 (Central Vacuole)',
    shortDescription: '巨大的调节中心',
    structure: '【结构特征】\n成熟植物细胞中最大的细胞器，几乎占据细胞体积的90%。充满细胞液。',
    function: '【核心功能】\n通过渗透压支撑细胞（膨压），储存水、营养和代谢废物。',
    color: 'bg-blue-300',
    hexColor: '#bfdbfe',
    position: { top: '20%', left: '20%', width: '60%', height: '60%' },
    // Occupy the center-bottom major volume
    position3d: [0, -1.0, 0], 
    scale3d: [6.0, 6.5, 1.8], // Large flattened sac
    shapeType: 'rounded_box', // Using rounded box for volume fill
    icon: '💧',
    image: 'https://images.unsplash.com/photo-1616866657876-b63d76e33d26?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'nucleus',
    name: '细胞核 (Nucleus)',
    shortDescription: '指挥中心',
    structure: '【结构特征】\n双层核膜、核仁、染色质。通常被大液泡挤压到细胞边缘。',
    function: '【核心功能】\n遗传信息库，细胞代谢和遗传的控制中心。',
    color: 'bg-purple-500',
    hexColor: '#a855f7',
    position: { top: '10%', left: '60%', width: '20%', height: '20%' },
    // Top Right Corner
    position3d: [1.8, 3.2, 0.5], 
    scale3d: [1.3, 1.3, 1.3],
    shapeType: 'sphere',
    icon: '🧬',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'er_rough',
    name: '粗面内质网 (Rough ER)',
    shortDescription: '蛋白合成车间',
    structure: '【结构特征】\n表面附有核糖体，与核膜外层相连。',
    function: '【核心功能】\n合成和加工分泌蛋白。',
    color: 'bg-pink-500',
    hexColor: '#ec4899',
    position: { top: '15%', left: '50%', width: '15%', height: '10%' },
    // Hugging the Nucleus
    position3d: [0.5, 3.0, 0.5], 
    scale3d: [0.8, 0.8, 0.8],
    rotation3d: [0, 0, 0.5],
    shapeType: 'torus_knot',
    icon: '🏭',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'er_smooth',
    name: '滑面内质网 (Smooth ER)',
    shortDescription: '脂质合成车间',
    structure: '【结构特征】\n无核糖体附着，管状网。',
    function: '【核心功能】\n合成脂质，解毒。',
    color: 'bg-pink-300',
    hexColor: '#f9a8d4',
    position: { top: '20%', left: '45%', width: '10%', height: '10%' },
    // Extending from Rough ER
    position3d: [-0.2, 2.5, 0.5], 
    scale3d: [0.5, 0.5, 0.5],
    rotation3d: [0, 0, 0],
    shapeType: 'torus_knot',
    icon: '🧼',
    image: 'https://plus.unsplash.com/premium_photo-1664303102456-43d9326f5556?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'chloroplast',
    name: '叶绿体 (Chloroplast)',
    shortDescription: '光合作用工厂',
    structure: '【结构特征】\n扁平椭球形，双层膜，含基粒和叶绿素。数量较多。',
    function: '【核心功能】\n光合作用：将光能转化为化学能。',
    color: 'bg-green-600',
    hexColor: '#15803d',
    position: { top: '60%', left: '10%', width: '15%', height: '15%' },
    // Main instance: Bottom Left
    position3d: [-2.2, -3.0, 0.8],
    scale3d: [1.4, 1.4, 0.7], // Flattened lens shape
    rotation3d: [0.5, 0.5, 0],
    shapeType: 'oval_sphere',
    icon: '🌿',
    image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'mitochondria',
    name: '线粒体 (Mitochondria)',
    shortDescription: '动力工厂',
    structure: '【结构特征】\n短棒状/胶囊状，双层膜，内膜折叠成嵴。',
    function: '【核心功能】\n有氧呼吸，产生ATP。',
    color: 'bg-red-500',
    hexColor: '#ef4444',
    position: { top: '80%', left: '70%', width: '10%', height: '10%' },
    // Main instance: Bottom Right
    position3d: [2.5, -3.5, 0.8],
    scale3d: [0.6, 0.6, 0.6],
    rotation3d: [0, 0, -0.5],
    shapeType: 'capsule',
    icon: '⚡',
    image: 'https://images.unsplash.com/photo-1595180373418-4c28f6453051?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'golgi',
    name: '高尔基体 (Golgi)',
    shortDescription: '分泌中心',
    structure: '【结构特征】\n扁平囊泡堆叠。',
    function: '【核心功能】\n蛋白质加工、包装和运输。',
    color: 'bg-orange-400',
    hexColor: '#fb923c',
    position: { top: '15%', left: '15%', width: '12%', height: '12%' },
    // Top Left
    position3d: [-2.2, 3.2, 0.5],
    scale3d: [0.9, 0.9, 0.9],
    rotation3d: [0, 0, 0.2],
    shapeType: 'box',
    icon: '📦',
    image: 'https://plus.unsplash.com/premium_photo-1673468507851-9e73551d7c3d?q=80&w=800&auto=format&fit=crop'
  }
];
