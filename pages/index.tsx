import type { NextPage } from 'next'
import {useState, Fragment, ReactNode, FC} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import S from 'sanctuary'
const {pipe} = S

type Bookstore = {
  name: ReactNode
  id: string
  searchUrl: (bookName: string) => string
  description?: ReactNode
}
const bookstores: Bookstore[] = [
  {
    name: 'Pages',
    id: 'pages',
    description: <span>a cool bookstore in kensington</span>,
    searchUrl: s => `https://pageskensington.com/browse/filter/t/${s}/k/keyword`,
  },
  {
    name: 'Shelf Life',
    id: 'shelf',
    description: <span>a cool bookstore on 4th street</span>,
    searchUrl: s => `https://store.shelflifebooks.ca/browse/filter/t/${s}/k/keyword`,
  },
  {
    name: 'the next page',
    id: 'page',
    description: <span>a cool bookstore in inglewood w pretty darn good espresso</span>,
    searchUrl: s => `https://www.nextpageyyc.ca/browse/filter/t/${s}/k/keyword`
  },
  {
    name: 'Library Genesis',
    id: 'libgen',
    description: <span>you shouldn&apos;t use this! this is piracy and piracy is illegal!</span>,
    searchUrl: s => `http://libgen.is/search.php?req=${s}&lg_topic=libgen&open=0&view=simple&res=25&phrase=1&column=def`
  },
  {
    name: 'Calgary Public Library',
    id: 'cpl',
    description: <span>the library. god save the queen.</span>,
    searchUrl: s => `https://calgary.bibliocommons.com/v2/search?searchType=smart&query=${s}`
  },
  {
    name: <span>Fair&apos;s Fair</span>,
    id: 'ff',
    description: <span>a big used bookstore in inglewood and chinook. unfortunately, you&apos;ll have to call them to check their stock.</span>,
    searchUrl: _ => 'http://www.fairsfair.com/contact-us.html',
  }
]

const genSearchUrl = ({searchUrl}: Bookstore) => pipe ([
  encodeURIComponent,
  searchUrl,
])

const WithArrow: FC = ({children}) => <Fragment>{children} &rarr;</Fragment>
const Home: NextPage = () => {
  const [bookName, setBookName] = useState ('')
  const {container, main, title, description, grid, card, footer} = styles
  return (
    <div className={container}>
      <Head>
        <title>Book Finder</title>
        <meta name="description" content="Find Books" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={main}>
        <h1 className={title}>
          Search for a book in Calgary
        </h1>

        <p className={description}>
          Enter your books name into the text box below. Each box will link to that bookstore&apos;s inventory, showing whether they have the book in stock, the price, &amp;c.
          <br />
          <br />
          <label htmlFor='book-input'>
            Book Name
            <input
              name='book'
              id='book-input'
              value={bookName}
              onChange={e => setBookName (e.target.value)}
            />
          </label>
        </p>

        <div className={grid}>
          {bookstores.map (store => (
            <a key={store.id} href={genSearchUrl (store) (bookName)} className={card}>
              <h2>
                <WithArrow>
                  {store.name}
                </WithArrow>
              </h2>
              <p>{store.description ?? 'a book store lol'}</p>
            </a>
          ))}
        </div>
      </main>

      <footer className={footer}>
        <a href="https://github.com/aljedaxi">
          made with &lt;3 by daxi
        </a>
      </footer>
    </div>
  )
}

export default Home
