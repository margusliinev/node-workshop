#include <stdio.h>
#include <stdlib.h>

int main() {
    
    FILE *outputFile = fopen("./dest.txt", "w")
    char c = fgetc(stdin);

    while (c != EOF) {
        printf(outputFile, "%c", c);
        fflush(outputFile);
        c = fgetc(stdin);
    }

    exit(0)
}