<?php

namespace AppBundle\Form;

use AppBundle\Entity\Account;
use FOS\UserBundle\Form\Type\ProfileFormType as BaseFormType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\FormBuilderInterface;

class ProfileFormType extends BaseFormType
{

    public function __construct()
    {
        parent::__construct(Account::class);
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        parent::buildForm($builder, $options);

        $builder->remove('username');
        $builder->remove('email');
        $builder->add('bio', TextareaType::class);
    }
}
