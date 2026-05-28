import Image from 'next/image'

interface ContentBlockProps {
  title: string
  text: string
  image: string
  imageAlt: string
  reverse?: boolean
}

export default function ContentBlock({ title, text, image, imageAlt, reverse = false }: ContentBlockProps) {
  return (
    <section className={`content-block ${reverse ? 'content-block--reverse' : ''}`}>
      <div className="content-block__image">
        <Image src={image} alt={imageAlt} width={510} height={677} />
      </div>
      <div className="content-block__content">
        <h2 className="content-block__title">{title}</h2>
        <div className="content-block__text">
          {text.split('\n\n').map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  )
}
