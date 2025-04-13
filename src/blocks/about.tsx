import { Avatar, Heading, Text } from "@radix-ui/themes"

export default function About() {
  return (
    <section id="about" className="mb-12">
      <div className="flex flex-col items-center mb-8">
        <Avatar
          size="8"
          fallback="BT"
          src="/profile.jpeg"
          radius="full"
          mb="4"
        ></Avatar>
        <Heading>The Portfolio of Björn Tirsén</Heading>
        <Text>
          Full stack developer with a passion for building fast, accessible web
          apps.
        </Text>
      </div>
      <div className="max-w-2xl mx-auto text-center">
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
