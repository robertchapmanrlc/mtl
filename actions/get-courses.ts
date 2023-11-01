import { database } from "@/lib/database";
import { Course } from "@prisma/client";

export async function getCourse(courseId: string) {
  try {
    const course = await database.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        genre: true,
        chapters: {
          orderBy: {
            createdAt: 'asc'
          }
        }
      }
    });
    return course;
  } catch (error) {
    console.log("[GET_COURSE]", error);
    return null;
  }
}

export async function getPurchasedCourses(userId: string) {
  try {
    const purchases = await database.purchase.findMany({
      where: {
        userId
      },
      include: {
        course: true
      }
    });

    const courses = purchases.map((purchase) => purchase.course) as Course[];

    return courses;

  } catch (error) {
    console.log("[GET_PURCHASED_COURSE]", error);
    return [];
  }
}

export async function getAllCourses() {
  try {
    const courses = await database.course.findMany({
      where: {
        isPublished: true
      }
    });
    return courses;
  } catch (error) {
    console.log("[GET_ALL_COURSES]", error);
    return [];
  }
}

export async function getTeacherCourses(userId: string) {
  try {
    const teacherId = userId;
    const teacherCourses = await database.course.findMany({
      where: {
        userId: teacherId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return teacherCourses;
  } catch (error) {
    console.log("[GET_TEACHER_COURSES]", error);
    return [];
  }
}
