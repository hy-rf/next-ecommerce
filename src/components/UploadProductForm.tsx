"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { storage, db, auth } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Autocomplete,
} from "@mui/material";
import { RecaptchaVerifier } from "firebase/auth";

export default function UploadProductForm() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    new RecaptchaVerifier(auth, document.getElementById("re")!, {
      callback: (res: any) => console.log(res),
    });
    e.preventDefault();
    if (!user || !name || !description || !price || !category || !image) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "product"), {
        name,
        description,
        price: parseFloat(price),
        category,
        createdAt: new Date(),
        createdBy: user.uid,
      });

      const storageRef = ref(storage, `products/${docRef.id}`);
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef);
      await updateDoc(doc(db, "product", docRef.id), {
        imageUrl,
      });

      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImage(null);

      toast.success("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add the product. Please try again.");
    }
  };

  if (!user) return null;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: "600px",
        margin: "0 auto",
        p: 4,
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom>
        Add New Product
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Price"
            variant="outlined"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            inputProps={{ min: "0", step: "0.01" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            freeSolo
            options={["set"]}
            value={category}
            onChange={(_event, newValue) => setCategory(newValue || "")}
            inputValue={category || ""}
            onInputChange={(_event, newInputValue) =>
              setCategory(newInputValue)
            }
            renderInput={(params) => (
              <TextField {...params} label="Category" variant="outlined" />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{ textAlign: "left" }}
          >
            Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
          </Button>
          {image && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected File: {image.name}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ py: 1.5 }}
          >
            Add Product
          </Button>
        </Grid>
      </Grid>
      <div id="re"></div>
    </Box>
  );
}
