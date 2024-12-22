import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#FDF6F0]">
      <div className="container relative mx-auto flex min-h-[250px] max-w-7xl items-center px-4 py-4 md:min-h-[300px]">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8">
          <div className="flex flex-col justify-center space-y-3 md:space-y-4">
            <h1 className="max-w-xl text-2xl font-bold tracking-tight text-green-950 md:text-3xl lg:text-4xl">
              Grab Upto 50% Off On Selected Product
            </h1>
            <div className="flex">
              <Button
                asChild
                className="bg-green-950 text-white hover:bg-green-900"
                size="lg"
              >
                <Link href="/products/headphones">
                  Buy Now
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative hidden md:block">
            <Image
              src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/beatsbydre.svg"
              alt="Stylized headphone illustration"
              width={400}
              height={400}
              className="object-contain p-8"
              priority
            />
          </div>
          {/* Mobile image */}
          <div className="relative md:hidden">
            <Image
              src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/beatsbydre.svg"
              alt="Stylized headphone illustration"
              width={300}
              height={300}
              className="object-contain p-6"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

