import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MenuFormSchema, menuSchema } from "@/schema/menuSchema";
import { useMenuStore } from "@/store/useMenuStore";
import { MenuItem } from "@/types/restaurantType";
import { Loader2 } from "lucide-react";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export const EditMenu = ({
  selectedMenu,
  editOpen,
  setEditOpen,
}: {
  selectedMenu: MenuItem;
  editOpen: boolean;
  setEditOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [input, setInput] = useState<MenuFormSchema>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });
  const {loading, editMenu} = useMenuStore();
  const [errors, setErrors] = useState<Partial<MenuFormSchema>>({})

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(input);

    const result = menuSchema.safeParse(input)
        if(!result.success){
            const fieldErrors = result.error?.formErrors?.fieldErrors
            setErrors(fieldErrors as Partial<MenuFormSchema>)
            return;
        }

        try {
          const formData = new FormData();
          formData.append("name", input.name);
          formData.append("description", input.description);
          formData.append("price", input.price.toString());
          if(input.image){
            formData.append("image", input.image);
          }
          await editMenu(selectedMenu._id, formData);
        } catch (error) {
          console.log(error);
        }
  };

  useEffect(() => {
    setInput({
      name: selectedMenu?.name || "",
      description: selectedMenu?.description || "",
      price: selectedMenu?.price || 0,
      image: undefined,
    });
  }, [selectedMenu]);

  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Menu</DialogTitle>
        <DialogDescription>
          Update your menu to keep your offerings fresh and exciting!
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <Label>Name</Label>
          <Input
            type="text"
            name="name"
            placeholder="Enter menu name"
            value={input.name}
            onChange={changeEventHandler}
          />
          {errors && <span className="text-sm text-red-600 font-medium">{errors.name}</span>}
        </div>
        <div>
          <Label>Description</Label>
          <Input
            type="text"
            name="description"
            value={input.description}
            onChange={changeEventHandler}
            placeholder="Enter menu description"
          />
          {errors && <span className="text-sm text-red-600 font-medium">{errors.description}</span>}
        </div>
        <div>
          <Label>Price in (Rupees)</Label>
          <Input
            type="number"
            name="price"
            value={input.price}
            onChange={changeEventHandler}
            placeholder="Enter menu price"
          />
          {errors && <span className="text-sm text-red-600 font-medium">{errors.price}</span>}
        </div>
        <div>
          <Label>Upload Menu Image</Label>
          <Input
            type="file"
            name="image"
            onChange={(e) =>
              setInput({ ...input, image: e.target.files?.[0] || undefined })
            }
          />
          {errors && <span className="text-sm text-red-600 font-medium">{errors.image?.name}</span>}
        </div>
        <DialogFooter className="mt-5">
          {loading ? (
            <Button disabled className="bg-orange hover:bg-hoverOrange">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button className="bg-orange hover:bg-hoverOrange">Submit</Button>
          )}
        </DialogFooter>
      </form>
      </DialogContent>
    </Dialog>
  );
};
