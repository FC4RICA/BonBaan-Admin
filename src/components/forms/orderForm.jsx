import { zodResolver } from "@hookform/resolvers/zod";
import {
  cancelOrderSchema,
  confirmOrderSchema,
  completeOrderSchema,
  orderStatusSchema
} from "../../schemas/orderSchema";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const CancelOrderForm = ({ onSubmit, closeDialog, children }) => {
  const form = useForm({
    resolver: zodResolver(cancelOrderSchema),
    defaultValues: {
      cancelReason: "",
    },
  });

  const handelSubmit = (values) => {
    if (onSubmit) {
      onSubmit(values);
    }
    if (closeDialog) {
      closeDialog();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handelSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="cancelReason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>เหตุผลการปฎิเสธคำสั่งซื้อ</FormLabel>
              <FormControl>
                <Input {...field} placeholder="หัวข้อเหตุผล" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {children}
      </form>
    </Form>
  );
};

const ConfirmOrderForm = ({ onSubmit, closeDialog, children }) => {
  const form = useForm({
    resolver: zodResolver(confirmOrderSchema),
    defaultValues: {
      price: "",
    },
  });

  const handelSubmit = (values) => {
    if (onSubmit) {
      onSubmit(values);
    }
    if (closeDialog) {
      closeDialog();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handelSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ราคา</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  placeholder="ราคาของคำสั่งซื้อ"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {children}
      </form>
    </Form>
  );
};

const OrderStatusForm = ({ onSubmit, closeDialog, children }) => {
  const form = useForm({
    resolver: zodResolver(orderStatusSchema),
    defaultValues: {
      status: ""
    }
  });

  const status = [
    {
      id: 1,
      name: "รอรับออเดอร์",
    },
    {
      id: 2,
      name: "กำลังเตรียมการ",
    },
    {
      id: 3,
      name: "กำลังดำเนินการ",
    },
    {
      id: 4,
      name: "รอการยืนยัน",
    }
  ]

  const handleSubmit = (values) => {
    if (onSubmit) onSubmit(values);
    if (closeDialog) closeDialog();
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>สถานะคำสั่งซื้อ</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกสถานะคำสั่งซื้อ" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {status.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>{item.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {children}
      </form>
    </Form>
  );
}

const CompleteOrderForm = ({ onSubmit, closeDialog, children }) => {
  const form = useForm({
    resolver: zodResolver(completeOrderSchema),
    defaultValues: {
      files: [],
    },
  });

  const { setValue, watch } = form;
  const uploadedFiles = watch("files", []);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setValue("files", [...uploadedFiles, ...files]);
  };

  const removeFile = (index) => {
    setValue(
      "files",
      uploadedFiles.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = (values) => {
    if (onSubmit) onSubmit(values);
    if (closeDialog) closeDialog();
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="grid grid-cols-3 gap-2 w-full bg-neutral-50 min-h-28 p-2 border border-[--border] rounded-md">
          {uploadedFiles.map((file, index) => (
            <div key={index} className="relative group [&>button]:hover:inline-flex">
              {file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-full h-24 object-cover rounded-md"
                />
              ) : (
                <video
                  src={URL.createObjectURL(file)}
                  className="w-full h-24 object-cover rounded-md"
                  controls
                />
              )}
              <Button
                type="button"
                variant="icon"
                size="xs"
                className="absolute top-1 right-1 hidden rounded-full"
                onClick={() => removeFile(index)}
              >
                <X />
              </Button>
            </div>
          ))}
        </div>

        <FormField
          control={form.control}
          name="files"
          render={({ field }) => (
            <FormItem>
              <FormLabel>หลักฐานการทำงาน</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  variant="file"
                  placeholder="รูปภาพหรือวิดีโอ"
                  multiple
                  accept="image/*,video/*"
                  ref={field.ref}
                  onChange={handleFileChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {children}
      </form>
    </Form>
  );
};

export { CancelOrderForm, ConfirmOrderForm, CompleteOrderForm, OrderStatusForm };
