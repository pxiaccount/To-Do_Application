import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title>To-Do Application</title>
      <body className="grid p-10 text-center justify-items-center grid-cols-1">
        {children}
      </body>
    </html>
  );
}