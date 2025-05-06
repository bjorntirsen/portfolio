import Image from "next/image"
import { Heading, Text } from "@radix-ui/themes"

export default function About() {
  return (
    <section id="about" className="mb-12">
      <div className="mb-8 flex flex-col items-center">
        <div className="relative mb-4 size-32 overflow-hidden rounded-full">
          <Image
            src="/profile.jpeg"
            alt="Björn Tirsén"
            fill
            sizes="128px"
            className="object-cover"
          />
        </div>
        <Heading>The Portfolio of Björn Tirsén</Heading>
        <Text className="text-center">
          Full stack developer with a passion for building fast, accessible web
          apps.
        </Text>
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <Text as="p" mb="2">
          Hello! I&#39;m a passionate full stack developer with 3 years of
          experience in building web applications. I specialize in React,
          Node.js, and everything connected to the web.
        </Text>
        <Text as="p" mb="2">
          When I&#39;m not coding, I like to spend time with the family, run and
          lift weights, read and watch movies.
        </Text>
      </div>
    </section>
  )
}
