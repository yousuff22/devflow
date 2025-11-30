interface Tag {
  _id: string;
  name: string;
}

interface author {
  _id: string;
  name: string;
  image: string;
}

interface Question {
  _id: string;
  title: string;
  tags: Tag[];
  author: author;
  creaetedAt: Date;
  upvotes: number;
  answers: number;
  views: number;
  createdAt: Date;
}
