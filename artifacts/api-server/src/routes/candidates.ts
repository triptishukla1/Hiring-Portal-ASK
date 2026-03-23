import { Router, type IRouter } from "express";
import { db, candidatesTable } from "@workspace/db";
import { CreateCandidateBody, GetCandidateParams } from "@workspace/api-zod";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.get("/candidates", async (_req, res) => {
  try {
    const candidates = await db.select().from(candidatesTable).orderBy(candidatesTable.createdAt);
    const mapped = candidates.map((c) => ({
      id: c.id,
      firstName: c.firstName,
      lastName: c.lastName,
      gender: c.gender,
      dateOfBirth: c.dateOfBirth,
      email: c.email,
      phoneNumber: c.phoneNumber,
      courseOfStudy: c.courseOfStudy,
      percentageScored: Number(c.percentageScored),
      nameOfCollege: c.nameOfCollege,
      hasBacklog: c.hasBacklog,
      createdAt: c.createdAt.toISOString(),
    }));
    res.json(mapped);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch candidates" });
  }
});

router.post("/candidates", async (req, res) => {
  const parsed = CreateCandidateBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed", details: parsed.error.format() });
    return;
  }

  try {
    const data = parsed.data;
    const [inserted] = await db
      .insert(candidatesTable)
      .values({
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        email: data.email,
        phoneNumber: data.phoneNumber,
        courseOfStudy: data.courseOfStudy,
        percentageScored: String(data.percentageScored),
        nameOfCollege: data.nameOfCollege,
        hasBacklog: data.hasBacklog,
      })
      .returning();

    res.status(201).json({
      id: inserted.id,
      firstName: inserted.firstName,
      lastName: inserted.lastName,
      gender: inserted.gender,
      dateOfBirth: inserted.dateOfBirth,
      email: inserted.email,
      phoneNumber: inserted.phoneNumber,
      courseOfStudy: inserted.courseOfStudy,
      percentageScored: Number(inserted.percentageScored),
      nameOfCollege: inserted.nameOfCollege,
      hasBacklog: inserted.hasBacklog,
      createdAt: inserted.createdAt.toISOString(),
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to create candidate" });
  }
});

router.get("/candidates/:id", async (req, res) => {
  const parsed = GetCandidateParams.safeParse({ id: Number(req.params.id) });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }

  try {
    const [candidate] = await db
      .select()
      .from(candidatesTable)
      .where(eq(candidatesTable.id, parsed.data.id));

    if (!candidate) {
      res.status(404).json({ error: "Candidate not found" });
      return;
    }

    res.json({
      id: candidate.id,
      firstName: candidate.firstName,
      lastName: candidate.lastName,
      gender: candidate.gender,
      dateOfBirth: candidate.dateOfBirth,
      email: candidate.email,
      phoneNumber: candidate.phoneNumber,
      courseOfStudy: candidate.courseOfStudy,
      percentageScored: Number(candidate.percentageScored),
      nameOfCollege: candidate.nameOfCollege,
      hasBacklog: candidate.hasBacklog,
      createdAt: candidate.createdAt.toISOString(),
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch candidate" });
  }
});

export default router;
