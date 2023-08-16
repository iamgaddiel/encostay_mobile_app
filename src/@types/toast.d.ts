export interface Toast{
    message: string
    isVisible: boolean
    type: ToastType
}

type ToastType = "success" | "warning" | "danger"