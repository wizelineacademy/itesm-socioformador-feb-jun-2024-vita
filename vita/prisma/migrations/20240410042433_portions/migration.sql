-- CreateTable
CREATE TABLE "PortionsNutrition" (
    "id_nutriton_portion" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "fruits" INTEGER NOT NULL,
    "vegetables" INTEGER NOT NULL,
    "milk" INTEGER NOT NULL,
    "legumes" INTEGER NOT NULL,
    "cereals" INTEGER NOT NULL,
    "meat" INTEGER NOT NULL,
    "sugar" INTEGER NOT NULL,
    "fat" INTEGER NOT NULL,

    CONSTRAINT "PortionsNutrition_pkey" PRIMARY KEY ("id_nutriton_portion")
);

-- CreateIndex
CREATE UNIQUE INDEX "PortionsNutrition_id_nutriton_portion_key" ON "PortionsNutrition"("id_nutriton_portion");

-- CreateIndex
CREATE UNIQUE INDEX "PortionsNutrition_id_user_key" ON "PortionsNutrition"("id_user");

-- AddForeignKey
ALTER TABLE "PortionsNutrition" ADD CONSTRAINT "PortionsNutrition_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
