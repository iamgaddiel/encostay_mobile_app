export interface Toast{
    message: string
    enabled: boolean
    type?: ToastType
}

type ToastType = "success" | "warning" | "danger"