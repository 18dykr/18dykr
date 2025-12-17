
export interface Organelle {
  id: string;
  name: string;
  shortDescription: string;
  structure: string;
  function: string;
  color: string; // Tailwind class for UI
  hexColor: string; // Hex code for 3D model
  position: { top: string; left: string; width: string; height: string }; // Keep for fallback or list views
  position3d: [number, number, number]; // x, y, z
  scale3d: [number, number, number]; // x, y, z
  rotation3d?: [number, number, number]; // x, y, z
  shapeType: 'sphere' | 'capsule' | 'oval_sphere' | 'irregular' | 'box' | 'torus_knot' | 'rounded_box';
  icon: string; // Lucide icon name or emoji
  image: string; // URL to a fine photo or diagram
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
