import { Router } from "express";
import { createTitleIndex, insertAuthor,createBooksCollection, createCappedLogsCollection } from "./collections.service.js";

const router = Router();

// 1.create books collection 
router.post('/books',async (req, res) => {
    const result = await createBooksCollection();
    res.status(201).json({ message: "Books collection created" });
}) 

// 3. Create a capped collection
router.post('/logs/capped',async (req, res) => {
  try {
    const result = await createCappedLogsCollection();

    return res.status(201).json({
      message: "Capped collection created",
      collection: result
    });

  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
})

// 4. Create an index on the books collection for the title field.
router.post("/index", async (req, res) => {
    const result = await createTitleIndex();
    console.log(result)
    return res.status(201).json({ message: "Index created", result });
});

// POST /collection/authors
router.post("/authors", async (req, res) => {
    const result = await insertAuthor(req.body);
    return res.status(201).json({ message: "Author inserted", result });
});


export default router;
