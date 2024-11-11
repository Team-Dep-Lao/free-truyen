'use client';

import * as React from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useNotification from '@/hooks/useNotification';
import { addDays } from 'date-fns';

export default function RedeemButton() {
  const [visible, setVisible] = React.useState(false);
  const { notification } = useNotification();

  function onSubmitCode() {
    const record = localStorage.getItem("APPLY_CODE");

    notification({
      title: 'Nhập code',
      description: "Bạn đã nhập mã code thành công. Chúc bạn có nhiều giờ trải nghiệm vui vẻ trên Free Truyện.",
      type: 'success'
    });
    localStorage.setItem("APPLY_CODE", String(addDays(new Date(record as string), 14)));
    setVisible(false)
  }

  return (
    <React.Fragment>
      <Button className="bg-green-500 hover:bg-green-400 text-white font-bold sm:flex hidden" onClick={() => setVisible(true)}>Mã Đổi</Button>
      <Dialog open={visible} onOpenChange={(open) => setVisible(open)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Mã đổi</DialogTitle>
            <DialogDescription>
              Nhập mã code để nhận được nhiều phần quà tương ứng.
            </DialogDescription>
          </DialogHeader>
          <Input
            className="col-span-3"
            placeholder='Nhập mã của bạn tại đây.'
          />
          <DialogFooter>
            <Button onClick={onSubmitCode} type="button">Xác nhận</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}