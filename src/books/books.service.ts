import { Body, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

// interface Book {
//   id: number;
//   title: string;
//   storyline: string;
//   genres: string[];
//   pages: number;
//   price: number;
//   name?: string;
//   phone?: string;
//   email?: string;
// }
@Injectable()
export class BooksService {
  private books = [
    {
      id: 1,
      title: 'American gods',
      storyline:
        'The story takes place in an imagined future, the year 1984, when much of the world has fallen victim to perpetual war, omnipresent government surveillance, historical negationism, and propaganda. Great Britain, known as Airstrip One, has become a province of a superstate named Oceania that is ruled by the Party who employ the Thought Police to persecute individuality and independent thinking. Big Brother, the leader of the Party, enjoys an intense cult of personality despite the fact that he may not even exist. The protagonist, Winston Smith, is a diligent and skillful rank-and-file worker and Party member who secretly hates the Party and dreams of rebellion. He enters a forbidden relationship with a co-worker, Julia.',
      genres: [
        'science fiction',
        'social science fiction',
        'dystopian fiction',
        'political fiction',
      ],
      pages: 328,
      price: 56,
    },
    {
      id: 2,
      title: 'Charlie and the Chocolate Factory',
      storyline:
        '11-year-old Charlie Bucket lives in poverty in a small house with his parents and four grandparents. One day, he buys a chocolate, Wonka Bar, and is invited to visit the chocolatier Willy Wonka.',
      genres: ["Children's fantasy novel"],
      pages: 192,
      price: 140,
    },
    {
      id: 3,
      title: 'JACK stiven',
      storyline:
        'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange, a drug capable of extending life and enhancing consciousness. Coveted across the known universe, melange is a prize worth killing for...',
      genres: ['science fiction'],
      pages: 4900,
      price: 16,
    },
  ];
  create(@Body() createBookDto: CreateBookDto) {
    const newBook = {
      storyline: '',
      pages: 0,
      price: 0,
      genres: ['science'],
      title: createBookDto.title,
      genre: createBookDto.genre,
      id: this.books.length > 0 ? this.books[this.books.length - 1].id + 1 : 1,
    };
    this.books.push(newBook);
    return newBook;
  }
  findAll(limit: number, page: number, pages: number) {
    if (pages) {
      const book = this?.books?.find((book) => +book.pages === +pages);
      return book;
    }
    return this?.books;
  }

  findOne(id: number) {
    const book = this?.books?.find((book) => book.id === id);
    if (!book) {
      throw new Error('Book not found');
    }
    return book;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    this.books = this.books.map((book) => {
      if (+book.id === +id) {
        return { ...book, ...updateBookDto };
      }
      return book;
    });
    return this.findOne(id);
  }
  remove(id: number) {
    const toBeRemoved = this?.books?.find((book) => +book.id === +id);
    this.books = this?.books?.filter((book) => +book.id !== +id);
    return toBeRemoved;
  }
}
