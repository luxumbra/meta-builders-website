

export interface IContentSectionProperties {
  title?: string;
  id?: string;
  justify?: string;
  children: React.ReactNode;
  lead?: React.ReactNode;
}
/**
 * **ContentSection** - Wraps each page section in a `section` element
 * @param param0 {title: string, id: string, justify?: string, children: React.ReactNode, lead: React.ReactNode}
 * @returns JSX.Element
 */
export function ContentSection({ title, id, justify, children, lead }: IContentSectionProperties): JSX.Element  {

  return (
    <section
      id={id}
      className={`
      flex
      flex-col
      items-center
      justify-${justify ?? "start"}
      scroll-mt-24
      w-full
      min-h-screen
      overflow-y-hidden
      overflow-x-hidden
      bg-slate-200
      dark:bg-blue-900
      `}
    >
      <div className="
      flex
      flex-col
      gap-4
      space-y-8
      w-full
      my-24
      items-center

      ">
        <div className="flex flex-col items-center gap-4">
          <h2 className="leadIn text-6xl font-extrabold tracking-tight text-center gradient-text text-shadow-alt">
            {title}
          </h2>
        </div>
        <p className="leadIn max-w-3xl text-2xl font-extrabold text-center">
          {lead}
        </p>
        {children}
      </div>
    </section>

  )
}

export default ContentSection

ContentSection.defaultProps = {
  title: "",
  id: "",
  justify: 'start',
  lead: <div className="hidden" />
}