import React, { useCallback, useEffect, useState } from 'react'
import { ToastContainer } from 'components/Toast'
import useToast from 'hooks/useToast'
import { db } from './firebaseConfig'

const FirebaseListener = () => {
  const { toastSuccess } = useToast()
  const [boxPurchase, setBoxPurchase] = useState([])

  const currentTime = 1639291226000
  // new Date().getTime()

  useEffect(() => {
    const boxPurchaseRef = db.ref('box-purchase')

    boxPurchaseRef.on('value', (snapshot) => {
      if (snapshot && snapshot.val()) {
        const data = Object.entries(snapshot.val())
        const queue = []
        // data.map((item: any) => {
        //   const time = item[0]
        //   const date = new Date(time).getTime()
        //   if (date >= currentTime) {
        //     queue.push(item)
        //   }
        //   return item
        // })
        const item = data[data.length - 1]
        const time = item[0]
        const date = new Date(time).getTime()
        if (date >= currentTime) {
          queue.push(item)
        }

        setBoxPurchase(queue)
      }
    })

    return () => boxPurchaseRef.off()
  }, [])

  // const getBoxName = (box: string) => {
  //   switch (box) {
  //     case 'HTDCMBOX':
  //       return 'Box Common'
  //     case 'HTDRareBox':
  //       return 'Box Rare'
  //     case 'HTDEpicBox':
  //       return 'Box Epic'
  //     case 'HTDSSRBox':
  //       return 'Box Legendary'
  //     default:
  //       return 'Box'
  //   }
  // }

  // const mapWalletString = (address: string) => {
  //   return `${address.substring(0, 4)}...${address.substring(address.length - 5, address.length - 1)}`
  // }

  const toastNoti = useCallback(() => {
    if (boxPurchase.length > 0) {
      const toast = toastSuccess
      toast(`Received transaction`)
      setBoxPurchase([])
    }
  }, [boxPurchase.length, toastSuccess])

  useEffect(() => {
    toastNoti()
  }, [toastNoti])
  return <div />
}

export default FirebaseListener
