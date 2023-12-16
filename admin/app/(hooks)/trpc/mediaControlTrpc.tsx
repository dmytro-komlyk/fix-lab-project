import { trpc } from 'admin/app/(utils)/trpc'
import toast from 'react-hot-toast'

export const uploadImageTrpc = () =>
  trpc.uploadImageTrpc.useMutation({
    onError: () => {
      toast.error(`Помилка завантаження...`, {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
        },
      })
    },
  })

export const deleteImageTrpc = () =>
  trpc.deleteImageTrpc.useMutation({
    onError: () => {
      toast.error(`Помилка видалення...`, {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
        },
      })
    },
  })

export const uploadIconTrpc = () =>
  trpc.uploadIconTrpc.useMutation({
    onError: () => {
      toast.error(`Помилка завантаження...`, {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
        },
      })
    },
  })

export const deleteIconTrpc = () =>
  trpc.deleteIconTrpc.useMutation({
    onError: () => {
      toast.error(`Помилка видалення...`, {
        style: {
          borderRadius: '10px',
          background: 'grey',
          color: '#fff',
        },
      })
    },
  })
