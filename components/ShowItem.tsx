type itemProps = {
  title: string,
  content: string,
  url?: string,
  urlTitle?: string
}

const ShowItem = (props: itemProps) => {
  const { title, content } = props;

  if (props.url && props.urlTitle) {
    return <div className="mt-2">
      <p className="font-thin text-sm text-purple-700">{title}</p>
      <p className="p-1 my-1  font-thin text-xs bg-purple-100 rounded text-purple-700 flex flex-row justify-between">
        <span>{content}</span>
        <a href={props.url} target="_blank" className="underline" rel="noreferrer">
          {props.urlTitle || "check"}
        </a>
      </p>
    </div>
  } else {
    return <div className="mt-2">
      <p className="font-thin text-sm text-purple-700">{title}</p>
      <p className="p-1 my-1  font-thin text-xs bg-purple-100 rounded text-purple-700">{content}</p>
    </div>
  }


}

export default ShowItem;