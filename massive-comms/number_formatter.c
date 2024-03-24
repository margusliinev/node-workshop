#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[])
{

    FILE *outputFile = fopen(argv[1], "w");
    if (outputFile == NULL)
    {
        perror("Error opening file");
        return 1;
    }

    char *number = malloc(12 * sizeof(char));
    int index = 0;

    int c = fgetc(stdin);

    while (c != EOF)
    {
        if (c != ' ')
        {
            number[index] = c;
            index++;
        }
        else
        {
            number[index] = '%';
            number[++index] = '\0';
            fprintf(outputFile, "%s ", number);
            free(number);
            number = malloc(12 * sizeof(char));
            index = 0;
        }
        c = fgetc(stdin);
    }

    if (index > 0)
    {
        number[index] = '%';
        number[++index] = '\0';
        fprintf(outputFile, "%s ", number);
        free(number);
    }

    fclose(outputFile);
    exit(0);
}