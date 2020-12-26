library(pdftools)
library(tidyverse)
library(stringr)
library(plyr)

f1 = pdf_text("MOST_IMPORTANT_FORMAT.PDF") %>% readr::read_lines()
#it contains all the data in txt form

page1 = str_trim(f1[9:39])
a1 = strsplit(page1, split = "  +")
x1 = matrix(nrow = 0, ncol = 4)
for (i in 1:31) {
  if (is.na(a1[[i]][2]) == F){
    x1 = rbind(x1, a1[[i]])
  }
}

page2 = str_trim(f1[53:60])
a2 = strsplit(page2, split = "  +")
x2 = matrix(nrow = 0, ncol = 4)
for (i in 1:8) {
  if (is.na(a2[[i]][2]) == F){
    x2 = rbind(x2, a2[[i]])
  }
}

page3 = str_trim(f1[74:106])
a3 = strsplit(page3, split = "  +")
x3 = matrix(nrow = 0, ncol = 4)
for (i in 1:33) {
  if (is.na(a3[[i]][2]) == F){
    x3 = rbind(x3, a3[[i]])
  }
}

page4 = str_trim(f1[122:155])
a4 = strsplit(page4, split = "  +")
x4 = matrix(nrow = 0, ncol = 4)
for (i in 1:34) {
  if (is.na(a4[[i]][2]) == F){
    x4 = rbind(x4, a4[[i]])
  }
}

page5 = str_trim(f1[168:194])
a5 = strsplit(page5, split = "  +")
x5 = matrix(nrow = 0, ncol = 4)
for (i in 1:27) {
  if (is.na(a5[[i]][2]) == F){
    x5 = rbind(x5, a5[[i]])
  }
}

page6 = str_trim(f1[209:213])
a6 = strsplit(page6, split = "  +")
x6 = matrix(nrow = 0, ncol = 4)
for (i in 1:5) {
  if (is.na(a6[[i]][2]) == F){
    x6 = rbind(x6, a6[[i]])
  }
}

x = rbind(x1, x2, x3, x4, x5, x6)
colnames(x) = c("Test Name", "Value", "Unit", "Biological Reference")
write.csv(x, file = "IMP.csv")



