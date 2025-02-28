import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "../../schemas/categorySchema";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const CreateCategoryForm = ({ onSubmit }) => {
  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  const { reset } = form;

  const handelSubmit = (values) => {
    if (onSubmit) {
      onSubmit(values)
    }
    reset()
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handelSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ชื่อหมวดหมู่</FormLabel>
              <FormControl>
                <Input {...field} placeholder="ชื่อบริการ"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">เพิ่มหมวดหมู่ใหม่</Button>
      </form>
    </Form>
  );
};

const EditCategoryForm = ({ name, onCancel, onSubmit }) => {
  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: name,
    },
  });

  const handelSubmit = (values) => {
    if (onSubmit) {
      onSubmit(values)
    }
    onCancel()
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handelSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button type="submit">แก้ไขชื่อหมวดหมู่</Button>
          <Button variant="destructive" onClick={() => onCancel()}>
            ยกเลิก
          </Button>
        </div>
      </form>
    </Form>
  );
};

export { CreateCategoryForm, EditCategoryForm }