export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 border-t border-gray-700 mt-auto">
      <div className="container mx-auto px-4 sm:px-8 py-4">
        <p className="text-center text-sm text-gray-500">
          &copy; {currentYear} ForumHub. Todos os direitos reservados. Desenvolvido por André Victor.
        </p>
      </div>
    </footer>
  );
}
