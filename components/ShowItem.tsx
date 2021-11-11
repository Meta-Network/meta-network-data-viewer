type itemProps = {
  title: string,
  content: string
}

const ShowItem = (props: itemProps) => {
  const { title, content } = props;
  return <div className="mt-2">
    <p className="font-thin text-sm text-purple-700">{title}</p>
    <p className="p-1 my-1  font-thin text-xs bg-purple-100 rounded text-purple-700">{content}</p>
  </div>
}

export default ShowItem;