"use client"

import { Button, Dialog, Text } from "@radix-ui/themes"
import { ExternalLink } from "lucide-react"

interface ProjectButtonsProps {
  repo?: string
  live_url?: string
  lessons_learned?: string
  title: string
}

export function ProjectButtons({
  repo,
  live_url,
  lessons_learned,
  title,
}: ProjectButtonsProps) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {repo && (
        <Button variant="outline" asChild>
          <a href={repo} target="_blank" rel="noopener noreferrer">
            View Repo <ExternalLink />
          </a>
        </Button>
      )}
      {live_url && (
        <Button variant="outline" asChild>
          <a href={live_url} target="_blank" rel="noopener noreferrer">
            Live Site <ExternalLink />
          </a>
        </Button>
      )}
      {lessons_learned && (
        <Dialog.Root>
          <Dialog.Trigger>
            <Button variant="solid">Lessons Learned</Button>
          </Dialog.Trigger>
          <Dialog.Content asChild>
            <div
              className="max-w-[450px]"
              style={{ backgroundColor: "var(--accent-2)" }}
            >
              <Dialog.Title>Lessons Learned</Dialog.Title>
              <Dialog.Description>
                Key takeaways from the {title} project
              </Dialog.Description>
              <Text as="p" className="text-muted-foreground text-sm">
                {lessons_learned}
              </Text>
              <Dialog.Close>
                <Button mt="4">Close</Button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Root>
      )}
    </div>
  )
}
