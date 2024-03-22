#include <stdio.h>
#include <stdlib.h>

int main() {
    
    FILE *outputFile = fopen("./dest.txt", "w");
    if (outputFile == NULL) {
        perror("Error opening file");
        return 1;
    }

    char c = fgetc(stdin);

    while (c != EOF) {
        fprintf(outputFile, "%c", c);
        fflush(outputFile);
        c = fgetc(stdin);
    }

    fclose(outputFile);
    exit(0);
}