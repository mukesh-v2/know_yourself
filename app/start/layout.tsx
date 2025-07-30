import Image from "next/image";

export default function TestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-screen">
      <body>
        <div className="w-full flex justify-center bg-brand-100 h-24">
             <Image
            src="/company_logo.png"
            alt="Logo"
            width={300}
            height={100}
            className="h-20 justify-between transition-transform duration-300 hover:scale-110 contain mt-2"
          />
        </div>
        {children}
      </body>
    </html>
  );
}
