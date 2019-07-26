library(tidyverse)
library(naniar)
library(jsonlite)

steps <- jsonlite::fromJSON("processed.json")

steps <- as_tibble(steps)

steps <- steps %>% unnest() %>% unnest(relatives, .drop = FALSE) %>% select(
  order,
  step = title,
  process_document = title1,
  process_document_parts = children,
  actor = title2
)

steps %>% replace_with_na(replace = list(process_document_parts = NULL))

steps %>% mutate(
  process_document_parts = case_when(process_document_parts == NULL ~ NA_real_, TRUE ~ process_document_parts)
)
