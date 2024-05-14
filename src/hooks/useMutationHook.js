import { useMutation } from "@tanstack/react-query"

export const useMutationHooks = (fnCallback) => {
    const mutation = useMutation({
        mutationFn: fnCallback,
        mutateOptions: {
            throwOnError: false // Ngăn React Query gửi yêu cầu mạng khi có lỗi
        }
    })
    return mutation
}
