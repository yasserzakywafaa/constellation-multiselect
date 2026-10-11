import { Option } from "./types";

const options: Option[] = [
  { value: "react", label: "React" },
  { value: "nodejs", label: "Node.js" },
  { value: "dotnet", label: ".NET", disabled: true },
  { value: "typescript", label: "TypeScript" },
  { value: "design-systems", label: "Design Systems" },
  { value: "nextjs", label: "Next.js" },
  { value: "react-native", label: "React Native" },
  { value: "styled-components", label: "Styled Components" },
  { value: "storybook", label: "Storybook" },
  { value: "testing", label: "Testing (Vitest + RTL)" },
  { value: "accessibility", label: "Accessibility" },
  { value: "mongodb", label: "MongoDB" },
  { value: "python", label: "Python", disabled: true },
  { value: "openai-sdk", label: "OpenAI SDK" },
];

export default options;
