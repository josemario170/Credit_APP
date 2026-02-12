export type StepStatus = 'completed' | 'current' | 'locked' | 'available'

export interface DocumentStep {
  id: string
  stepNumber: number
  image: any
  title: string
  description?: string
  route: string
}
