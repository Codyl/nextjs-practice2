// import MessageField from '@/components/MessageField'
// import Messages from '@/components/Messages'
import { db } from '@/db/db'

interface PageProps {
  params: {
    roomId: string
  }
}

const page = async ({ params }: PageProps) => {
  const { roomId } = params


  return (
    <div>
      <p>{ roomId }</p>
    </div>
  )
}

export default page