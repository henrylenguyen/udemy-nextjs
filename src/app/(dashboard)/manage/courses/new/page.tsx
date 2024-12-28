import { CourseAddNew, Heading } from "@/components/common";
import { getUserById } from "@/servers/controllers/user.controller";
import { auth } from "@clerk/nextjs/server";

interface INewCourseProps {
}

const NewCourse: React.FunctionComponent<INewCourseProps> = async (props) => {
  const { userId } = await auth()
  if(!userId) return null
  const mongoUser = await getUserById({ userId })
  if(!mongoUser) return null
  return (
    <div>
      <Heading>tạo khóa học mới</Heading>
      <CourseAddNew user={JSON.parse(JSON.stringify(mongoUser))}/>
    </div>
  );
};

export default NewCourse;