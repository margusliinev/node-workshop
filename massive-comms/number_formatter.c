#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
    
    FILE *outputFile = fopen(argv[1], "w");
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