import { Router } from "express";
import {
  createBook,
  createManyBooks,
  updateBook,
  getOneBook,
  getBooksInRange,
  getBooksByGenre,
  getPaginatedBooks,
  getBooksByType,
  getExcludedGenres,
  deleteOldBooks,
  aggSortBooks,
  aggProjectBooks,
  unwindGenres,
  joinBooksWithLogs,
} from "./books.service.js";

const router = Router();

// 5. create book
router.post("/create", async (req, res, next) => {
    console.log(req.body)
  const result = await createBook(req.body);
  return res.status(201).json({ message: "Book created", result });
});



// 6. insert many
router.post("/many", async (req, res, next) => {
  const result = await createManyBooks(req.body);
  return res.status(201).json({ result });
});




// 8. update book
router.patch("/update/future", async (req, res, next) => {
  const result = await updateBook();
  return res.status(202).json({ message: "updated", result });
});

// 9. Find a Book with title “Brave New World”.
router.get("/title", async (req, res, next) => {
  const {title}=req.query
  const result = await getOneBook(title);
  return res.status(200).json(result);
});

// 10. Find all books published between 1990 and 2010.
router.get("/year", async (req, res, next) => {
  const {from,to}=req.query
  const result = await getBooksInRange(from,to);
  return res.status(200).json(result);
});

// 11. Find all books by genre
router.get("/genre", async (req, res, next) => {
  const {genre}=req.query
  const result = await getBooksByGenre(genre);
  return res.status(200).json(result);
});

// 12. Skip the first two books, limit the results to the next three, sorted by year in descending order.
router.get("/pagination", async (req, res, next) => {
  const result = await getPaginatedBooks();
  return res.status(200).json(result);
});

// 13. Find books where the year field stored as an integer.
router.get("/type", async (req, res, next) => {
  const result = await getBooksByType();
  return res.status(200).json(result);
});

// 10. 14. Find all books where the genres field does not include any of the genres "Horror" or "Science Fiction".
router.get("/exclude", async (req, res, next) => {
  const result = await getExcludedGenres();
  return res.status(200).json(result);
});

// 15. Delete all books published before 2000.
router.delete("/before-year", async (req, res, next) => {
  const {year}=req.query
  console.log(year)
  const result = await deleteOldBooks(year);
  return res.status(200).json(result);
});

// 16. Using aggregation Functions,
router.get("/agg1", async (req, res, next) => {
  const result = await aggSortBooks();
  return res.status(200).json(result);
});

// 17. Using aggregation functions, Find all books published after the year 2000. For each
// matching book, show only the title, author, and year fields.
router.get("/agg2", async (req, res, next) => {
  const result = await aggProjectBooks();
  return res.status(200).json(result);
});

// 14. 18. Using aggregation functions,break an array of genres into separate documents.
router.get("/unwind", async (req, res, next) => {
  const result = await unwindGenres();
  return res.status(200).json(result);
});

// 19. Using aggregation functions, Join the books collection with the logs collection.
router.get("/join", async (req, res, next) => {
  const result = await joinBooksWithLogs();
  return res.status(200).json(result);
});

export default router;
