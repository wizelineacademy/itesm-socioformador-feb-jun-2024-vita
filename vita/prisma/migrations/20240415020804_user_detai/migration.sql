-- CreateTable
CREATE TABLE "UserDetail" (
    "id_user_detail" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "sex" VARCHAR(1) NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "body_fat" DOUBLE PRECISION NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserDetail_pkey" PRIMARY KEY ("id_user_detail")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserDetail_id_user_detail_key" ON "UserDetail"("id_user_detail");

-- CreateIndex
CREATE UNIQUE INDEX "UserDetail_id_user_key" ON "UserDetail"("id_user");

-- AddForeignKey
ALTER TABLE "UserDetail" ADD CONSTRAINT "UserDetail_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
