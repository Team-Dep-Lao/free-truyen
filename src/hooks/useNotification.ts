import * as React from 'react'
import { useToast } from './use-toast';

export interface UseNotificationProps {
  title: string;
  description: string;
  type?: 'info' | 'warning' | 'error' | 'success'
}

export default function useNotification () {
  const {toast} = useToast()

  function notification ({title, description, type}: UseNotificationProps) {

    let result = ""
    switch (type) {
      case 'error':
        result = "bg-red-500"
        break;
      case "success":
        result = "bg-green-500"
        break;
      case "warning":
        result = "bg-orange-500"
        break;
      default:
        break
      }

    toast({
      title, description, className: `text-white ${result}`,
    })
  }

  return {
    notification
  }
}