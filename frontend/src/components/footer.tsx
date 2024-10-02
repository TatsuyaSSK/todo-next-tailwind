import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="sticky top-full mx-0 mt-4 box-border flex justify-center p-0">
      <div className="container flex h-16 items-center border-t py-10">
        <ul className="flex gap-4 text-sm text-gray-400">
          <Link href="/terms">
            <li>利用規約</li>
          </Link>
          <Link href="/privacy">
            <li>プライバシーポリシー</li>
          </Link>
          <Link href="https://forms.gle/tNVEj3MxTmQEHcj96">
            <li>お問い合わせ</li>
          </Link>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
