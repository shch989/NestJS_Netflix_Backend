import { Contains, Equals, IsArray, IsBoolean, IsCreditCard, IsDate, IsDateString, IsDefined, IsDivisibleBy, IsEmpty, IsEnum, IsHexColor, IsIn, IsInt, IsLatLong, IsNegative, IsNotEmpty, IsNotIn, IsNumber, IsOptional, IsPositive, IsString, IsUUID, Max, MaxLength, Min, MinLength, NotContains, NotEquals, registerDecorator, Validate, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator"

enum MovieGenre {
    Fantasy = "fantasy",
    Action = 'action'
}

@ValidatorConstraint({
    async: true,
})
class PasswordValidator implements ValidatorConstraintInterface {
    validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
        return value.length > 4 && value.length < 8;
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
        return "비밀번호의 길이는 4~8자 이어야합니다. 입력된 비밀번호: {$value}"
    }
}

function IsPasswordValid(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: PasswordValidator
        })
    }
}

export class UpdateMoiveDto {

    @IsNotEmpty()
    @IsOptional()
    title?: string

    @IsNotEmpty()
    @IsOptional()
    genre?: string

    /// null || undefined
    // @IsDefined()
    // @IsOptional()
    // @Equals('code factory')
    // @NotEquals('code factory')
    /// null || undefined || ""
    // @IsEmpty()
    // @IsNotEmpty()
    /// Array
    // @IsIn(['action', 'fantasy'])
    // @IsNotIn(['action', 'fantasy'])
    // @IsBoolean()
    // @IsString()
    // @IsNumber()
    // @IsInt()
    // @IsArray()
    // @IsEnum(MovieGenre)
    // @IsDateString()
    // @IsDivisibleBy(5)
    // @IsPositive()
    // @IsNegative()
    // @Min(100)
    // @Max(100)
    // @Contains("code factory")
    // @NotContains("code factory")
    // @IsCreditCard()
    // @IsHexColor()
    // @MaxLength(16)
    // @MinLength(16)
    // @IsUUID()
    // @IsLatLong()
    // @Validate(PasswordValidator, {
    //     message: "다른 에러 메세지"
    // })
    @IsPasswordValid()
    test: string
}